using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Domain.Enums;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public class TokenService
{
    private readonly string _securityKey;
    
    public TokenService(string securityKey)
    {
        _securityKey = securityKey;
    }
    
    public string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityKey = Encoding.ASCII.GetBytes(_securityKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(UserRole), user.Role))
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(securityKey),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
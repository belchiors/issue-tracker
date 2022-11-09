using System;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Shared;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class AccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly IUserRepository _userRepository;
    private readonly TokenService _tokenService;
    
    public AccountService(ILogger<AccountService> logger, IUserRepository userRepository, TokenService tokenService)
    {
        _logger = logger;
        _userRepository = userRepository;
        _tokenService = tokenService;
    }
    
    public async Task<string?> AuthenticateUser(UserDto dto)
    {
        var user = await _userRepository.FindByEmail(dto.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UserNotFoundException();
        
        return _tokenService.GenerateToken(user);
    }
    
    public async Task CreateNewUser(UserDto dto)
    {
        var user = await _userRepository.FindByEmail(dto.Email);
        
        if (user != null)
            throw new UserConflictException();

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        await _userRepository.Insert(new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = passwordHash
        });
        
        _logger.LogInformation("User created with success");
    }
}
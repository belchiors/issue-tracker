namespace Application.Contract;

public class JwtResponseDto
{
    public string Token { get; set; }
    public UserDto User { get; set; }
}
using System;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Contract;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class AccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly IUserRepository _userRepository;
    private readonly TokenService _tokenService;
    private readonly IMapper _mapper;
    
    public AccountService(ILogger<AccountService> logger,
        IUserRepository userRepository,
        TokenService tokenService,
        IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
        _userRepository = userRepository;
        _tokenService = tokenService;
    }
    
    public async Task<JwtResponseDto> AuthenticateUser(SignInDto dto)
    {
        var user = await _userRepository.FindByEmail(dto.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UserNotFoundException();

        var response = new JwtResponseDto()
        {
            Token = _tokenService.GenerateToken(user),
            User = _mapper.Map<UserDto>(user)
        };
        
        return response;
    }
    
    public async Task CreateNewUser(SignUpDto dto)
    {
        var user = await _userRepository.FindByEmail(dto.Email);
        if (user != null)
            throw new UserConflictException();

        var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        var newUser = _mapper.Map<User>(dto);
        newUser.PasswordHash = hash;
        
        await _userRepository.Insert(newUser);
        _logger.LogInformation("User created with success");
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var members = await _userRepository.FindAll(user => user.Role.Equals(UserRole.Member));
        return members.Select(user => _mapper.Map<UserDto>(user));
    }
}
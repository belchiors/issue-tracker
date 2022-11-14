using System;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services;
using Application.Contract;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountController(AccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] SignInDto dto)
    {
        try
        {
            var token = await _accountService.AuthenticateUser(dto);
            return Ok(token);
        }
        catch (UserNotFoundException)
        {
            return NotFound("Incorrect email or password");
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto dto)
    {
        try
        {
            await _accountService.CreateNewUser(dto);
            return Created("", dto);
        }
        catch (UserConflictException)
        {
            return Conflict("Email has already been taken");
        }
    }
}
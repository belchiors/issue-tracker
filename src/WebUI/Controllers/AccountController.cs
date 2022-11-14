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
    public async Task<IActionResult> SignIn([FromBody] SignInDto model)
    {
        try
        {
            var token = await _accountService.AuthenticateUser(model);
            return Ok(token);
        }
        catch (UserNotFoundException)
        {
            return NotFound("Incorrect email or password");
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto model)
    {
        try
        {
            await _accountService.CreateNewUser(model);
            return Created("", model);
        }
        catch (UserConflictException)
        {
            return Conflict("Email has already been taken");
        }
    }
}
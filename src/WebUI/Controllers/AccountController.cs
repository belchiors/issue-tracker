using System;
using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services;
using Application.Shared;
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
    public async Task<IActionResult> SignIn(UserDto dto)
    {
        try
        {
            var token = await _accountService.AuthenticateUser(dto);
            return Ok(token);
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp(UserDto dto)
    {
        try
        {
            await _accountService.CreateNewUser(dto);
            return Created("", dto);
        }
        catch (UserConflictException)
        {
            return Conflict("");
        }
    }
}
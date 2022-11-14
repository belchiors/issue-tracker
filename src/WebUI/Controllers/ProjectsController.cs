using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Services;
using Application.Contract;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _service;

    public ProjectsController(ProjectService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<ProjectResponseDto>> Get()
    {
        return await _service.GetAllProjectsAsync();
    }

    [HttpPost]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> Create(ProjectRequestDto model)
    {
        // Get current logged in user name identifier
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        await _service.CreateProjectAsync(model, userId!);
        return Created("", model);
    }
}
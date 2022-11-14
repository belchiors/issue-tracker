using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Services;
using Application.ViewModel;
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
    public async Task<IEnumerable<ProjectResponseViewModel>> Get()
    {
        return await _service.GetAllProjectsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(ProjectRequestViewModel model)
    {
        // Get current logged in user name identifier
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        await _service.CreateProjectAsync(model, userId!);
        return Created("", model);
    }
}
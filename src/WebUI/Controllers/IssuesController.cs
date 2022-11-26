using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Contract;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class IssuesController : ControllerBase
{
    private readonly IssueService _issueService;

    public IssuesController(IssueService issueService)
    {
        _issueService = issueService;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _issueService.GetAllIssuesAsync());
    }

    [HttpGet("{projectId}")]
    public async Task<IActionResult> Get(int projectId)
    {
        return Ok(await _issueService.GetIssuesByProjectIdAsync(projectId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(IssueRequestDto dto)
    {
        // Get current logged in user name identifier
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _issueService.CreateAsync(dto, Convert.ToInt32(userId));
        return Created("", dto);
    }
}
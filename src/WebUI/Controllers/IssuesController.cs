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
    public async Task<IActionResult> Get([FromQuery] string? projectId)
    {
        return Ok(await _issueService.GetIssuesAsync(projectId));
    }

    [HttpPut]
    [Authorize(Roles="Admin,Member")]
    public async Task<IActionResult> Create([FromBody] IssueRequestDto dto)
    {
        // Get current logged in user name identifier
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _issueService.CreateOrUpdateAsync(dto, userId);
        return Ok();
    }
    
    [HttpDelete]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> Delete([FromBody] string issueId)
    {
        await _issueService.DeleteIssue(issueId);
        return Ok();
    }
}
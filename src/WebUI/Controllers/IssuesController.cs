using System;
using System.Threading.Tasks;
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

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string projectId)
    {
        var issues = await _issueService.GetIssuesByProjectId(Guid.Parse(projectId));
        return Ok(issues);
    }
}
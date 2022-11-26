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

    [HttpGet("{issueId}")]
    public async Task<IActionResult> Get(int issueId)
    {
        try
        {
            var issue = await _issueService.GetByIdAsync(issueId);
            return Ok(issue);
        }
        catch (Exception e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(IssueRequestDto dto)
    {
        // Get current logged in user name identifier
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _issueService.CreateAsync(dto, Convert.ToInt32(userId));
        return Created("", dto);
    }

    [HttpDelete("{issueId}")]
    [Authorize]
    public async Task<IActionResult> Delete(int issueId)
    {
        await _issueService.DeleteIssue(issueId);
        return Ok();
    }
    
}
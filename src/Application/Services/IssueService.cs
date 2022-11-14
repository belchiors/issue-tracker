using Application.Contract;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class IssueService
{
    private readonly ILogger<IssueService> _logger;
    private readonly IIssueRepository _issueRepository;

    public IssueService(ILogger<IssueService> logger, IIssueRepository issueRepository)
    {
        _logger = logger;
        _issueRepository = issueRepository;
    }

    public async Task<IEnumerable<IssueResponseDto>> GetAllIssuesAsync()
    {
        var issues = await _issueRepository.FindAll();
        return issues.Select(issue => new IssueResponseDto
        {
            Id = issue.Id,
            Title = issue.Title,
            Description = issue.Description,
            Priority = Enum.GetName(typeof(IssuePriority), issue.Priority),
            Status = Enum.GetName(typeof(IssueStatus), issue.Status),
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            Reporter = $"{issue.Reporter.FirstName} {issue.Reporter.LastName}",
        });
    }

    public async Task<IEnumerable<IssueResponseDto>> GetIssuesByProjectId(Guid projectId)
    {
        var issues = await _issueRepository.FindAll(issue => issue.ProjectId.Equals(projectId));
        return issues.Select(issue => new IssueResponseDto
        {
            Id = issue.Id,
            Title = issue.Title,
            Description = issue.Description,
            Priority = Enum.GetName(typeof(IssuePriority), issue.Priority),
            Status = Enum.GetName(typeof(IssueStatus), issue.Status),
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            Reporter = $"{issue.Reporter.FirstName} {issue.Reporter.LastName}",
        });
    }

    public async Task CreateNewIssue(IssueRequestDto dto)
    {
        var issue = new Issue
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = IssuePriority.None,
            Status = IssueStatus.Open,
            UserId = Guid.Parse(dto.UserId),
            ProjectId = Guid.Parse(dto.ProjectId)
        };

        await _issueRepository.Insert(issue);
    }
}
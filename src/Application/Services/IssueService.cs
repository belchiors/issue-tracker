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
            Id = issue.Id.ToString(),
            Summary = issue.Summary,
            Description = issue.Description,
            Priority = Enum.GetName(typeof(IssuePriority), issue.Priority),
            Status = Enum.GetName(typeof(IssueStatus), issue.Status),
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            Project = issue.Project.Name,
            Reporter = new UserDto
            {
                FirstName = issue.Reporter.FirstName,
                LastName = issue.Reporter.LastName,
            },
            Assignee = new UserDto
            {
                FirstName = issue.Assignee?.FirstName,
                LastName = issue.Assignee?.LastName
            }
        });
    }

    public async Task<IEnumerable<IssueResponseDto>> GetIssuesByProjectId(Guid projectId)
    {
        var issues = await _issueRepository.FindAll(issue => issue.ProjectId.Equals(projectId));
        return issues.Select(issue => new IssueResponseDto
        {
            Id = issue.Id.ToString(),
            Summary = issue.Summary,
            Description = issue.Description,
            Priority = Enum.GetName(typeof(IssuePriority), issue.Priority),
            Status = Enum.GetName(typeof(IssueStatus), issue.Status),
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            Project = issue.Project.Name,
            Reporter = new UserDto
            {
                FirstName = issue.Reporter.FirstName,
                LastName = issue.Reporter.LastName,
            },
            Assignee = new UserDto
            {
                FirstName = issue.Assignee?.FirstName,
                LastName = issue.Assignee?.LastName
            }
        });
    }

    public async Task CreateNewIssue(IssueRequestDto dto, string userId)
    {
        var issue = new Issue
        {
            Summary = dto.Summary,
            Description = dto.Description,
            Priority = IssuePriority.None,
            Status = IssueStatus.Open,
            ReporterId = Guid.Parse(userId),
            ProjectId = Guid.Parse(dto.ProjectId),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        
        if (dto.Priority != null)
            issue.Priority = (IssuePriority) Enum.ToObject(typeof(IssuePriority), dto.Priority);

        if (dto.Status != null)
            issue.Status = (IssueStatus) Enum.ToObject(typeof(IssueStatus), dto.Status);

        if (!String.IsNullOrEmpty(dto.AssigneeId))
            issue.AssigneeId = Guid.Parse(dto.AssigneeId);

        await _issueRepository.Insert(issue);
    }

    public async Task UpdateIssue(IssueResponseDto dto, string userId)
    {
        var issue = new Issue
        {
            Id = Guid.Parse(dto.Id!),
            Summary = dto.Summary,
            Description = dto.Description,
            Priority = (IssuePriority) Enum.Parse(typeof(IssuePriority), dto.Priority),
            Status = (IssueStatus) Enum.Parse(typeof(IssueStatus), dto.Status),
            UpdatedAt = DateTime.UtcNow
        };
        
        await _issueRepository.Update(issue);
    }

    public async Task DeleteIssue(string issueId)
    {
        var issue = await _issueRepository.FindById(Guid.Parse(issueId));
        await _issueRepository.Delete(issue);
    }
}
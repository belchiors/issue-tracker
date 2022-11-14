using Application.ViewModel;
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

    public async Task<IEnumerable<IssueResponseViewModel>> GetAllIssuesAsync()
    {
        var issues = await _issueRepository.FindAll();
        return issues.Select(issue => new IssueResponseViewModel
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

    public async Task<IEnumerable<IssueResponseViewModel>> GetIssuesByProjectId(Guid projectId)
    {
        var issues = await _issueRepository.FindAll(issue => issue.ProjectId.Equals(projectId));
        return issues.Select(issue => new IssueResponseViewModel
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

    public async Task CreateNewIssue(IssueRequestViewModel model)
    {
        var issue = new Issue
        {
            Title = model.Title,
            Description = model.Description,
            Priority = (IssuePriority)model.Priority,
            Status = (IssueStatus)model.Status,
            UserId = Guid.Parse(model.UserId),
            ProjectId = Guid.Parse(model.ProjectId)
        };

        await _issueRepository.Insert(issue);
    }
}
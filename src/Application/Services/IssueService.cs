using Application.Contract;
using Application.Exceptions;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class IssueService
{
    private readonly ILogger<IssueService> _logger;
    private readonly IIssueRepository _issueRepository;
    private readonly IMapper _mapper;

    public IssueService(ILogger<IssueService> logger, IIssueRepository issueRepository, IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
        _issueRepository = issueRepository;
    }
    
    public async Task<IEnumerable<IssueResponseDto>> GetAllIssuesAsync(int? reporterId, int? assigneeId)
    {
        var issues = await _issueRepository.FindAll();

        if (reporterId != null || assigneeId != null)
        {
            // convert issues to queryable and filter by reporter or assignee
            issues = issues.AsQueryable();
            if (reporterId != null)
                issues = issues.Where(issue => issue.ReporterId.Equals(reporterId));
            if (assigneeId != null)
                issues = issues.Where(issue => issue.AssigneeId.Equals(assigneeId));
        }

        return issues.Select(issue => _mapper.Map<IssueResponseDto>(issue));
    }

    public async Task<IssueResponseDto> GetByIdAsync(int issueId)
    {
        var issue = await _issueRepository.FindById(issueId);
        if (issue == null)
            throw new NotFoundException<Issue>();
        return _mapper.Map<IssueResponseDto>(issue);
    }

    public async Task<IEnumerable<IssueResponseDto>> GetByProjectIdAsync(int projectId)
    {
        var issues = await _issueRepository.FindAll(issue => issue.ProjectId.Equals(projectId));
        return issues.Select(issue => _mapper.Map<IssueResponseDto>(issue));
    }

    public async Task CreateAsync(IssueRequestDto dto, int userId)
    {
        var issue = _mapper.Map<Issue>(dto);
        issue.ReporterId = userId;
        await _issueRepository.Insert(issue);
    }

    public async Task UpdateAsync(IssueRequestDto dto, int userId)
    {
        var issue = _mapper.Map<Issue>(dto);
        issue.ReporterId = userId;
        issue.UpdatedAt = DateTime.UtcNow;
        await _issueRepository.Update(issue);
    }

    public async Task DeleteIssue(int issueId)
    {
        var issue = await _issueRepository.FindById(issueId);
        await _issueRepository.Delete(issue);
    }
}
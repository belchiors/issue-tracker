using Application.Contract;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class ProjectService
{
    private readonly ILogger<ProjectService> _logger;
    private readonly IProjectRepository _repository;

    public ProjectService(ILogger<ProjectService> logger, IProjectRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    public async Task<IEnumerable<ProjectResponseDto>> GetAllProjectsAsync()
    {
        var items = await _repository.FindAll();
        return items.Select((item) => new ProjectResponseDto
        {
            Id = item.Id,
            Name = item.Name,
            Description = item.Description,
            Url = item.Url,
            CreatedAt = item.CreatedAt,
            Issues = item.Issues?.Count() ?? 0
        });
    }
    
    public async Task CreateProjectAsync(ProjectRequestDto model, string userId)
    {
        var entity = new Project
        {
            Name = model.Name,
            Description = model.Description,
            CreatedAt = DateTime.UtcNow,
            Url = model.Url,
            UserId = Guid.Parse(userId)
        };

        await _repository.Insert(entity);
        
        _logger.LogInformation("Project entity created with success");
    }
}
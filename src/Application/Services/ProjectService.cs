using Application.Contract;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class ProjectService
{
    private readonly ILogger<ProjectService> _logger;
    private readonly IProjectRepository _repository;
    private readonly IMapper _mapper;

    public ProjectService(ILogger<ProjectService> logger, IProjectRepository repository, IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
        _repository = repository;
    }

    public async Task<IEnumerable<ProjectResponseDto>> GetAllProjectsAsync()
    {
        var projects = await _repository.FindAll();
        return projects.Select(project => _mapper.Map<ProjectResponseDto>(project));
    }

    public async Task CreateProjectAsync(ProjectRequestDto dto, int userId)
    {
        var project = _mapper.Map<Project>(dto);
        project.UserId = userId;
        project.CreatedAt = DateTime.UtcNow;
        await _repository.Insert(project);
    }
}
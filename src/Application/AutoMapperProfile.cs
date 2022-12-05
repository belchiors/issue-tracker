using Application.Contract;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<IssueRequestDto, Issue>()
            .ForMember(dest => dest.Priority, map =>
                map.MapFrom(src => (IssuePriority) Enum.Parse(typeof(IssuePriority), src.Priority)))
            .ForMember(dest => dest.Status, map =>
            map.MapFrom(src => (IssueStatus) Enum.Parse(typeof(IssueStatus), src.Status)));
        
        CreateMap<Issue, IssueResponseDto>()
            .ForMember(dest => dest.Priority, map =>
                map.MapFrom(src => Enum.GetName(typeof(IssuePriority), src.Priority)))
            .ForMember(dest => dest.Status, map =>
                map.MapFrom(src => Enum.GetName(typeof(IssueStatus), src.Status)));

        CreateMap<ProjectRequestDto, Project>();
        
        CreateMap<Project, ProjectResponseDto>()
            .ForMember(dest => dest.Issues, map =>
                map.MapFrom(src => src.Issues.Count()));

        CreateMap<SignUpDto, User>();
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Role, map
                => map.MapFrom(src => Enum.GetName(typeof(UserRole), src.Role)));
    }
}
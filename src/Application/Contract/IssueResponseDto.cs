namespace Application.Contract;

public class IssueResponseDto : IssueRequestDto
{
    public UserDto? Reporter { get; set; }
    public ProjectResponseDto? Project { get; set; }
    public UserDto? Assignee { get; set; }
}
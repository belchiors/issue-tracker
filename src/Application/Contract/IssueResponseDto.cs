namespace Application.Contract;

public class IssueResponseDto
{
    public string? Id { get; set; }
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public UserDto Reporter { get; set; }
    public string? Project { get; set; }
    public UserDto Assignee { get; set; }
}
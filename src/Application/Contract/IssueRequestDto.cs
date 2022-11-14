using System.ComponentModel.DataAnnotations;

namespace Application.Contract;

public class IssueRequestDto
{
    [Required] public string Title { get; set; }
    public string? Description { get; set; }
    public int? Priority { get; set; }
    public int? Status { get; set; }
    [Required] public string UserId { get; set; }
    [Required] public string ProjectId { get; set; }
}
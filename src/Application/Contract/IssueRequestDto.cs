using System.ComponentModel.DataAnnotations;

namespace Application.Contract;

public class IssueRequestDto
{
    [Required] public string Summary { get; set; }
    [Required] public string Description { get; set; }
    public int? Priority { get; set; }
    public int? Status { get; set; }
    [Required] public string ProjectId { get; set; }
    public string? AssigneeId { get; set; }
}
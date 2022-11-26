using System.ComponentModel.DataAnnotations;

namespace Application.Contract;

public class IssueRequestDto
{
    public int? Id { get; set; }
    [Required] public string Summary { get; set; }
    [Required] public string Description { get; set; }
    public int? Priority { get; set; }
    public int? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [Required] public int ProjectId { get; set; }
    public int? AssigneeId { get; set; }
}
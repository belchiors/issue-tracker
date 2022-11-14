using System.ComponentModel.DataAnnotations;

namespace Application.ViewModel;

public class IssueRequestViewModel
{
    [Required] public string Title { get; set; }
    public string? Description { get; set; }
    [Required] public int Priority { get; set; }
    [Required] public int Status { get; set; }
    [Required] public string UserId { get; set; }
    [Required] public string ProjectId { get; set; }
}
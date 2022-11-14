using Domain.Entities;

namespace Application.ViewModel;

public class IssueResponseViewModel
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Reporter { get; set; }
}
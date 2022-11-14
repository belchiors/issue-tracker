using System.ComponentModel.DataAnnotations;

namespace Application.ViewModel;

public class ProjectRequestViewModel
{
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
    [DataType(DataType.Url)] public string? Url { get; set; }
}
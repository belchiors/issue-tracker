using System.ComponentModel.DataAnnotations;

namespace Application.Contract;

public class ProjectRequestDto
{
    [Required] public string Name { get; set; }
    [Required] public string Description { get; set; }
    [DataType(DataType.Url)] public string? Url { get; set; }
}
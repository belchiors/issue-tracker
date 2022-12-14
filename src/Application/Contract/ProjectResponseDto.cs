namespace Application.Contract;

public class ProjectResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Issues { get; set; }
}
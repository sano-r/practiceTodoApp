namespace todo_react_app.Models;

public class TodoItem
{
    /// <summary>
    /// ID
    /// </summary>
    public int Id { get; set; }

    public string Name { get; set; }

    public bool IsComplete {  get; set; }
}
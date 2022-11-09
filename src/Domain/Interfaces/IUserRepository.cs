using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> FindByEmail(string email);
}
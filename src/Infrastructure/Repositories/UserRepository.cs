using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> FindById(int id)
    {
        return await _dbContext.Users.FindAsync(id);
    }

    public async Task<User?> FindByEmail(string email)
    {
        return await _dbContext.Users.SingleOrDefaultAsync(user => user.Email.Equals(email));
    }

    public async Task<IEnumerable<User>> FindAll()
    {
        return await _dbContext.Users.ToListAsync();
    }

    public async Task<IEnumerable<User>> FindAll(Expression<Func<User, bool>> predicate)
    {
        return await _dbContext.Users.Where(predicate).ToListAsync();
    }

    public async Task Insert(User entity)
    {
       await _dbContext.Users.AddAsync(entity);
       await _dbContext.SaveChangesAsync();
    }

    public async Task Update(User entity)
    {
        _dbContext.Users.Update(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(User entity)
    {
        _dbContext.Users.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}
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

public class CommentRepository : IRepository<Comment>
{
    private readonly ApplicationDbContext _dbContext;

    public CommentRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<Comment?> FindById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Comment>> FindAll()
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Comment>> FindAll(Expression<Func<Comment, bool>> predicate)
    {
        return await _dbContext.Comments.Where(predicate).ToListAsync();
    }

    public async Task Insert(Comment entity)
    {
        await _dbContext.Comments.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(Comment entity)
    {
        _dbContext.Comments.Update(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(Comment entity)
    {
        _dbContext.Comments.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}
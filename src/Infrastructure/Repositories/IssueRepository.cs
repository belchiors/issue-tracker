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

public class IssueRepository : IIssueRepository
{
    private readonly ApplicationDbContext _dbContext;

    public IssueRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Issue?> FindById(Guid id)
    {
        return await _dbContext.Issues.FindAsync(id);
    }

    public async Task<IEnumerable<Issue>> FindAll()
    {
        return await _dbContext.Issues.ToListAsync();
    }

    public async Task<IEnumerable<Issue>> FindAll(Expression<Func<Issue, bool>> predicate)
    {
        return await _dbContext.Issues.Where(predicate).ToListAsync();
    }

    public async Task Insert(Issue entity)
    {
        await _dbContext.Issues.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(Issue entity)
    {
        _dbContext.Issues.Update(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(Issue entity)
    {
        _dbContext.Issues.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}
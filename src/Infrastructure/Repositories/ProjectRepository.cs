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

public class ProjectRepository : IRepository<Project>
{
    private readonly ApplicationDbContext _dbContext;

    public ProjectRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Project?> FindById(Guid id)
    {
        return await _dbContext.Projects.FindAsync(id);
    }

    public async Task<IEnumerable<Project>> FindAll()
    {
        return await _dbContext.Projects.ToListAsync();
    }

    public async Task<IEnumerable<Project>> FindAll(Expression<Func<Project, bool>> predicate)
    {
        return await _dbContext.Projects.Where(predicate).ToListAsync();
    }

    public async Task Insert(Project entity)
    {
        await _dbContext.Projects.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(Project entity)
    {
        _dbContext.Projects.Update(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(Project entity)
    {
        _dbContext.Projects.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}
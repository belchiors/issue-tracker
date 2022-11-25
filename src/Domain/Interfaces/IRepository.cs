using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Domain.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> FindById(int id);
    Task<IEnumerable<T>> FindAll();
    Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> predicate);
    Task Insert(T entity);
    Task Update(T entity);
    Task Delete(T entity);
}
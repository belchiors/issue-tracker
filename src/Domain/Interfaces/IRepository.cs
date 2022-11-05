using System;
using System.Collections.Generic;

namespace Domain.Interfaces;

public interface IRepository<T> where T : class
{
    T? FindById(Guid id);
    IEnumerable<T> FindAll();
    IEnumerable<T> FindAll(Predicate<T> predicate);
    void Insert(T entity);
    void Update(T entity);
    void Delete(T entity);
}
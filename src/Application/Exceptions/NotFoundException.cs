using System;

namespace Application.Exceptions;

public class NotFoundException<T> : Exception where T : class
{
    public NotFoundException() : base() {}
}
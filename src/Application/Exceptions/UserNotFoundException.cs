using System;

namespace Application.Exceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException() : base() {}
}
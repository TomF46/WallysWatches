<?php

namespace App\Filters;

use App\Models\User;
use Illuminate\Http\Request;

class CustomerSearch
{
    public static function apply(Request $filters)
    {
        $users = (new User)->newQuery();

        if ($filters->has('firstName')) {
            $users->where('firstName', 'like', "{$filters->input('firstName')}%");
        }

        if ($filters->has('lastName')) {
            $users->where('lastName', 'like', "{$filters->input('lastName')}%");
        }

        return $users;
    }
}

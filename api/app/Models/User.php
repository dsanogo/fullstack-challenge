<?php

namespace App\Models;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return object
     * @throws BindingResolutionException
     */
    public function getWeather()
    {
        $redis = app()->make('redis');
        $data = $redis->get("weather_$this->id");
        if ($data) {
            $data = (array)json_decode($data);
            $data['expires_in'] = isset($data['created_at']) ? 60 - now()->diffInMinutes($data['created_at']) : 0;
        }
        return $data ? (object)$data : null;
    }
}

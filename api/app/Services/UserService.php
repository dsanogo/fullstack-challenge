<?php

namespace App\Services;

use App\Events\StoreWeatherData;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    protected User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    /**
     * @return Collection
     */
    public function fetch()
    {
        return $this->userModel->all();
    }

    /**
     * @param int $userId
     * @return mixed
     */
    public function get(int $userId)
    {
        return $this->userModel->findOrFail($userId);
    }

    /**
     * @param int $userId
     * @param array $weatherData
     * @return array|null
     */
    public function storeWeatherData(int $userId, array $weatherData): ?array
    {
        $weatherData['created_at'] = now();
        return event(new StoreWeatherData($userId, $weatherData));
    }
}

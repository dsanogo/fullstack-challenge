<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StoreWeatherData implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $userId;
    public array $weatherData;
    /**
     * Create a new event instance.
     */
    public function __construct(int $userId, array $weatherData)
    {
        $this->userId = $userId;
        $this->weatherData = $weatherData;
    }
}

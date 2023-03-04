<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public UserService $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }

    /**
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function index()
    {
        try {
            return UserResource::collection($this->userService->fetch());
        }catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 500);
        }
    }

    /**
     * @param int $userId
     * @return UserResource|JsonResponse
     */
    public function show(int $userId)
    {
        try {
            return new UserResource($this->userService->get($userId));
        }catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 500);
        }
    }

    /**
     * @param int $userId
     * @param Request $request
     * @return JsonResponse
     */
    public function storeWeatherData(int $userId, Request $request)
    {
        try {
            $this->userService->storeWeaterData($userId, $request->get('data'));
            return response()->json('success');
        }catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 500);
        }
    }
}

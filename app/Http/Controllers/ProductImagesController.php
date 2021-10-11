<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;


class ProductImagesController extends Controller
{
    public function store(Request $request)
    {

        $attributes = $this->validateImage($request);
        $file = Storage::disk('s3')->put('product-images', $attributes['file']);
        $path = Storage::disk('s3')->url($file);
        return response()->json([
            'path' => $path
        ]);
    }


    protected function validateImage(Request $request)
    {
        return $request->validate([
            'file' => ['file']
        ]);
    }
}

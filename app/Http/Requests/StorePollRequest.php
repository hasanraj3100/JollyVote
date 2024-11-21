<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePollRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

       return [
            'pollTitle' => ['required', 'max:50'],
            'options' => ['required', 'array'],
            'options.*.title' => ['required', 'max:50', 'string'],
        ];

    }

    public function messages():array {
        return [
            'options.*.title.required' => 'Please enter a title for the option.',
        ];
    }
}

<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class OrderStatuses extends Enum
{
    const Processing  = 0;
    const Dispatched = 1;
    const Complete = 2;
}

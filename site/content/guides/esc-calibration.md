---
title: Калібрування ESC регуляторів швидкості
description: Детальна інструкція з калібрування ESC для оптимальної роботи моторів дрона
date: 2024-01-20
category: ESC
tags:
  - ESC
  - калібрування
  - мотори
  - Betaflight
draft: false
---

Калібрування ESC (Electronic Speed Controller) є важливим кроком для забезпечення синхронної роботи всіх моторів дрона. Неправильно відкалібровані регулятори можуть призвести до вібрацій, нестабільного польоту та зниження ефективності.

<section id="when" class="mt-8 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Коли потрібно калібрувати ESC</h2>
<p class="text-[16px] font-normal font-[Montserrat]">
Калібрування необхідне в наступних випадках:
<br />
<br />
<strong>Перша збірка дрона</strong> з новими ESC
<br />
<br />
<strong>Заміна одного або кількох ESC</strong>
<br />
<br />
<strong>Проблеми з синхронізацією моторів</strong>
<br />
<br />
<strong>Після оновлення прошивки ESC</strong>
</p>
</section>

<section id="preparation" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Підготовка до калібрування</h2>
<p class="text-[16px] font-normal font-[Montserrat]">
Перед початком переконайтеся:
</p>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Зніміть пропелери для безпеки
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Підключіть дрон до комп'ютера
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Відкрийте Betaflight Configurator
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-four.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Переконайтеся в стабільності USB з'єднання
</p>
</li>
</ul>
</section>

<section id="method1" class="scroll-mt-24 mt-10 bg-[#f5f5f5] px-[29px] py-[27px]">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Метод 1: Калібрування через Betaflight</h2>
<h3 class="font-[Montserrat] text-[18px] font-normal mb-3">Крок 1: Налаштування діапазону</h3>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Перейдіть на вкладку "Motors"
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Встановіть мінімальне значення (зазвичай 1000)
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Встановіть максимальне значення (зазвичай 2000)
</p>
</li>
</ul>

<h3 class="font-[Montserrat] text-[18px] font-normal mb-3 mt-6">Крок 2: Процес калібрування</h3>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Відключіть</strong> живлення дрона
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Встановіть <strong>максимальний газ</strong> на передавачі
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Підключіть</strong> акумулятор
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-four.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Дочекайтеся звукового сигналу ESC
</p>
</li>
</ul>
</section>

<section id="method2" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Метод 2: Ручне калібрування</h2>
<p class="text-[16px] font-normal font-[Montserrat]">
Для ESC що не підтримують автоматичне калібрування:
</p>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Встановіть максимальний газ
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Підключіть живлення
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Дочекайтеся 2-3 звукових сигналів
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-four.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
Швидко опустіть газ до мінімуму
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
ESC видасть серію коротких сигналів
</p>
</li>
</ul>
</section>

<section id="check" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Перевірка результатів</h2>
<p class="text-[16px] font-normal font-[Montserrat]">
Після калібрування перевірте:
<br />
<br />
<strong>Синхронний запуск</strong> всіх моторів
<br />
<br />
<strong>Однакову швидкість</strong> на одному значенні газу
<br />
<br />
<strong>Плавне прискорення</strong> без ривків
<br />
<br />
<strong>Відсутність вібрацій</strong> на холостому ходу
</p>
</section>

<section id="betaflight" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Налаштування в Betaflight</h2>
<h3 class="font-[Montserrat] text-[18px] font-normal mb-3">ESC/Motor Features</h3>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<code>DSHOT600</code> або <code>DSHOT300</code> для сучасних ESC
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<code>Motor PWM frequency</code> - зазвичай 480Hz для PWM
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<code>ESC sensor</code> - увімкніть для телеметрії
</p>
</li>
</ul>
</section>

<section id="problems" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Поширені проблеми</h2>
<h3 class="font-[Montserrat] text-[18px] font-normal mb-3">ESC не реагує на калібрування</h3>
<p class="text-[16px] font-normal font-[Montserrat]">
- Перевірте підключення сигнальних проводів
<br />
<br />
- Переконайтеся в правильності протоколу (PWM/DShot)
<br />
<br />
- Спробуйте калібрувати кожен ESC окремо
</p>

<h3 class="font-[Montserrat] text-[18px] font-normal mb-3 mt-6">Мотори крутяться з різною швидкістю</h3>
<p class="text-[16px] font-normal font-[Montserrat]">
- Повторіть калібрування
<br />
<br />
- Перевірте якість живлення
<br />
<br />
- Можливо потрібна заміна ESC
</p>
</section>

<section id="tips" class="mt-10 scroll-mt-24">
<h2 class="font-[Montserrat] text-[20px] lg:text-[24px] border-b border-[#ba0108] pb-3 font-normal mb-3">Поради експертів</h2>
<ul class="list-disc pl-5 space-y-2 text-[#333]">
<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-one.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Завжди знімайте пропелери</strong> під час калібрування
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-two.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Використовуйте якісне живлення</strong> для стабільних результатів
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-three.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Калібруйте всі ESC одночасно</strong> для кращої синхронізації
</p>
</li>

<li class="flex gap-3 items-center">
<img width="35" height="35" src="/img/list-guide-four.png" alt="" style="filter: none; box-shadow: none;" />
<p class="text-[16px] font-normal font-[Montserrat]">
<strong>Тестуйте на малих обертах</strong> перед повноцінним польотом
</p>
</li>
</ul>
</section>

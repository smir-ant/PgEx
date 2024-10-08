/* 
проверка верный ли запрос под задание | при подключении вызывать, isRightAnswer()
*/

/* скрипт для проверки того, что запрос пользователя возвращает то же самое что и нужный запрос.
даа, решил проверять по данным, ибо регулярками отлавливать сам запрос это дурка, хотя компьютеру было бы легче.

данные из запроса прилетают в виде
res1 = [{"a":1, "aa":11}, {"b": 2, "bb":22}]
res2 = [{"aa":11, "a":1}, {"bb":22, "b": 2}] 
где объекты это строки, а ключи-значения это столбики.
я решил, что строки обязаны иметь строгий порядок (ибо сортировка), но в столбиках пофиг на порядок.
а то иначе выходит что «select c1, c2 from t» это верно, а «select c2, c1 from t» неверно 
*/

function isRightAnswer(arrAns, arrUser) {
    // Шаг 1: Проверяем, одинаковая ли длина у двух массивов
    if (arrAns.length !== arrUser.length) {
        return false;
    }

    // Вспомогательная функция для сравнения двух объектов
    function objectsEqual(objAns, objUser) {
        // Получаем массивы ключей из обоих объектов
        const keys1 = Object.keys(objAns);
        const keys2 = Object.keys(objUser);

        // Шаг 2: Проверяем, одинаковая ли длина массивов ключей
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Шаг 3: Проходимся по каждому ключу из первого объекта
        for (const key of keys1) {
            // Шаг 4: Проверяем, равны ли значения для каждого ключа в обоих объектах
            if (objAns[key] !== objUser[key]) {
                return false;
            }
        }

        // Если все ключи и значения совпадают, возвращаем true
        return true;
    }

    // Шаг 5: Проходимся по каждому объекту в первом массиве
    for (let i = 0; i < arrAns.length; i++) {
        // Получаем объекты из обоих массивов по текущему индексу
        const objAns = arrAns[i];
        const objUser = arrUser[i];

        // Шаг 6: Сравниваем объекты при помощи функции objectsEqual
        if (!objectsEqual(objAns, objUser)) {
            return false;
        }
    }

    // Если все объекты равны, возвращаем true
    return true;
}
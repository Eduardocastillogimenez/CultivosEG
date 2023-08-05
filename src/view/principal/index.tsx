import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

interface Cultivos {
    cultivos?: Object;
    startDate?: string;
    endDate?: string;
}

function Principal(props: Cultivos) {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Maíz',
            children: <p>El maíz prospera mejor en un clima soleado, con una temperatura óptima alrededor de 20 grados Celsius.
                Bajo estas condiciones, el maíz crece de manera saludable y alcanza su madurez adecuada para la cosecha.</p>,
        },
        {
            key: '2',
            label: 'Frijoles',
            children: <p>Los frijoles prefieren un clima lluvioso y una temperatura óptima de alrededor de 25 grados Celsius.
                La humedad favorece su crecimiento y desarrollo, lo que resulta en una cosecha exitosa.</p>,
        },
        {
            key: '3',
            label: 'Zanahorias',
            children: <p>Para las zanahorias, un clima soleado es preferible. Estas raíces dulces y crujientes prosperan mejor a una temperatura óptima de alrededor de 15 grados Celsius.</p>,
        },
        {
            key: '4',
            label: 'Tomate',
            children: <p>Los tomates también prosperan en climas soleados. Una temperatura óptima de alrededor de 28 grados Celsius es ideal para su crecimiento saludable y para obtener frutos sabrosos.</p>,
        },
        {
            key: '5',
            label: 'Papa',
            children: <p>Las papas prefieren un clima nublado. Una temperatura óptima de alrededor de 17 grados Celsius es ideal para su crecimiento y desarrollo. La luz solar directa en exceso puede afectar negativamente su crecimiento.</p>,
        },
        {
            key: '6',
            label: 'Calabaza',
            children: <p>Las calabazas disfrutan de climas calurosos. Una temperatura óptima alrededor de los 25 grados Celsius promueve su rápido crecimiento y maduración.</p>,
        },
        {
            key: '7',
            label: 'Cebolla',
            children: <p>Las cebollas prefieren un clima nublado. Una temperatura óptima de alrededor de 18 grados Celsius es beneficiosa para su desarrollo y para obtener bulbos de calidad.</p>,
        },
        {
            key: '8',
            label: 'Lechuga',
            children: <p>La lechuga se desarrolla bien en climas nublados. Una temperatura óptima de alrededor de 13 grados Celsius es ideal para su crecimiento rápido y para obtener hojas frescas y crujientes.</p>,
        },
        {
            key: '9',
            label: 'Espárragos',
            children: <p>Los espárragos también prefieren climas nublados. Una temperatura óptima de alrededor de 20 grados Celsius es beneficiosa para su crecimiento saludable y para obtener brotes tiernos.</p>,
        },
        {
            key: '10',
            label: 'Plátano',
            children: <p>Los plátanos prosperan en climas soleados y cálidos. Una temperatura óptima de alrededor de 30 grados Celsius favorece su rápido crecimiento y maduración.</p>,
        }
    ];
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return <Collapse items={items} onChange={onChange} />;
};

export default Principal;
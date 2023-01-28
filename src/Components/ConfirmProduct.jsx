const ConfirmProduct = () => {

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <>
            <tr>
                <td>Lorem ipsum dolor sit amet.</td>
                <td className="tp">{rupiah("20000")}</td>
                <td className="tq">1</td>
                <td className="ta"><button>Confirm</button></td>
            </tr>
        </>
    )
}

export default ConfirmProduct
export function htmlContent(raffle_id, date, number) {
  const htmlContent = `
    <!DOCTYPE html>
<html>
<head>
    <title>certificate copy</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
    	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    	body{
    		font-family: 'Poppins', sans-serif;
    	}
    </style>
</head>
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <table id="Table_01" width="500"  border="0" cellpadding="0" cellspacing="0" align="center">

        <tr height="316" class="background-image-class" style="background-image: url('https://adamtechngologies.s3.ap-south-1.amazonaws.com/owpc/WhatsApp+Image+2023-09-05+at+16.05.26.jpg'); background-size: fit;">
            <td valign="top">                
				<br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span style="color: yellow; font-weight: bold;"> 10000 X 12 Months </span>
            </td>
        </tr>
        <tr height="270" class="background-image-class" style="background-image: url('https://adamtechngologies.s3.ap-south-1.amazonaws.com/owpc/Certificate+Image+2.jpg'); background-size: fit;">

            <td valign="top">
            	<table width="100%" cellpadding="4" cellspacing="4" >
            	<tr>
        		<td>
        			<span style="border-radius: 50px; border: 1px solid grey; padding: 8px; font-size: 12px; font-weight: bold">
        				Date of issue : <b>${date}</b>
        			</span>
        		</td>
        		<td align="right">
        			<span style="border-radius: 50px; border: 1px solid grey; padding: 8px; font-size: 12px; font-weight: bold">
        				Raffle ID : <b>${raffle_id}</b>
        			</span>
        		</td>
        	</tr>
            	</table>
               <p style="font-size: 14px; margin-left: 8px; margin-right: 8px; font-weight: bold; font-size: 12px;">
               	Be the change and change <br>
				the world with OWPMillionaire
               </p>

                <p style="font-size: 10px; margin-left: 8px; margin-right: 8px">
               	OWPMILLIONAIRE is a global movement focused on reducing carbon emissions to create a more breathable home for Earth’s people, with its efforts aligned with the United Nations’ 2030 sustainable development goals.
                </p>

               	<p style="font-size: 10px; margin-left: 8px; margin-right: 8px">
				It recognizes pro-environment choices by previewing the best life for its green initiative contributors. Seeking to attain a greener planet through the Green Certificates and Tree Seeds, OWPMillionaire encourages cooperation through eco-responsible events, draws, and sustainable merchandise manufactured to spread awareness of crucial matters.
				</p>

				<p style="font-size: 10px; margin-left: 8px; margin-right: 8px">
				Our role is to be a large-scale, internationally recognized institution working close to communities to live with a sense of duty to combat global warming in every action.
               </p>

            </td>
        </tr>
        <tr height="121" class="background-image-class" style="background-image: url('https://adamtechngologies.s3.ap-south-1.amazonaws.com/owpc/Certifcate+Image+2.jpg'); background-size: fit; background-repeat: no-repeat;">
            <td>
                &nbsp;
            </td>
        </tr>
    </table>
</body>
</html>
`;
  return htmlContent;
}

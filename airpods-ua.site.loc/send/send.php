 <?php
	session_start();

	$name = stripslashes(htmlspecialchars($_POST['name']));
	$phone = stripslashes(htmlspecialchars($_POST['phone']));

	if (empty($name) || empty($phone)) {
		echo '<h1 style="color:red;">Пожалуйста заполните все поля</h1>';
		echo '<meta http-equiv="refresh" content="2; url=http://' . $_SERVER['SERVER_NAME'] . '">';
	} else {
		$product = $_POST['product'];
		$price = floatval($_POST['price']);
		$town = $_POST['town'];
		$post = $_POST['post'];
		$paymethod = $_POST['paymethod'];
		$comment = $_POST['comment'];
		$site = $_SERVER['SERVER_NAME'];
		$ip = $_SERVER['REMOTE_ADDR'];
		$utm_source = $_SESSION['utms']['utm_source'];
		$utm_medium = $_SESSION['utms']['utm_medium'];
		$utm_campaign = $_SESSION['utms']['utm_campaign'];
		$utm_content = $_SESSION['utms']['utm_content'];
		$utm_term = $_SESSION['utms']['utm_term'];

		//Формирование номера заказа
		$filename       = 'orderNum.txt';
		$number         = file_get_contents($filename);
		$number++;
		file_put_contents($filename, $number);
		$d              = date("ymd");
		$order_id       = $d . $number;

		// $data_mail = "name=$name&phone=$phone"; 
		$success_url = '../thanks/thank-you.html?' . $data_mail;

		// Генерация письма и отправка в Телеграм

		$to = '';
		$subject = "Заказ с $site #$order_id!";
		$message = "	
	$subject\n	
	Имя: $name\n
	Телефон: $phone\n
	Состав заказа: $product\n
	Цена: $price\n
	Город: $town\n
	Номер НП: $post\n
	Способ оплаты: $paymethod\n
	Коммент: $comment\n
	IP: $ip\n
	UTM-метки: $utm_source&$utm_medium&$utm_campaign&$utm_content&$utm_term
	";

		// $tg_bot_id = '1179832794:AAEDixMPqVYY_A8yQpxJikf0nC75vB6KWJI';
		$tg_bot_id = '638313694:AAEMHbjHAqgD9XhKDC1hoYR9fLchyXIQp1E';
		$tg_query = [
			// 'chat_id'    => -470558798,
			'chat_id'    => -347506891,
			'parse_mode' => 'HTML',
			'text'       => $message
		];
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, 'https://api.telegram.org/bot' . $tg_bot_id . '/sendMessage');
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($tg_query));
		$out = curl_exec($curl);
		curl_close($curl);

		if ($curl == false)
		{
			echo '<h1 style="color:red;">Произошла ошибка!</h1>';		
		}
		else 
		{
			header('Location: '.$success_url);
			exit;
		}
	}
